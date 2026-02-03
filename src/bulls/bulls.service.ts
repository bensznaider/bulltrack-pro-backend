import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, Op, literal, where, col } from 'sequelize';
import { Bull } from './bull.model';
import { CreateBullDto } from './dto/create-bull.dto';

export type BullsListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  origen?: 'propio' | 'catalogo';
  uso?: 'vaquillona' | 'vaca';
  pelaje?: 'negro' | 'colorado';
  sort?: 'score_desc' | 'score_asc';
};

@Injectable()
export class BullsService {
  constructor(@InjectModel(Bull) private readonly bullModel: typeof Bull) {}

  private toBullCreatePayload(dto: CreateBullDto) {
    return {
      caravana: dto.caravana,
      nombre: dto.nombre,
      uso: dto.uso,
      origen: dto.origen,
      pelaje: dto.pelaje,
      raza: dto.raza,
      edadMeses: dto.edad_meses,
      caracteristicaDestacada: dto.caracteristica_destacada ?? null,
      // flatten stats for DB columns
      crecimiento: dto.stats.crecimiento,
      facilidadParto: dto.stats.facilidad_parto,
      reproduccion: dto.stats.reproduccion,
      moderacion: dto.stats.moderacion,
      carcasa: dto.stats.carcasa,
    };
  }

  async createOne(dto: CreateBullDto) {
    const created = await this.bullModel.create(this.toBullCreatePayload(dto));
    return created;
  }

  async createBulk(dtos: CreateBullDto[]) {
    const payload = dtos.map((dto) => this.toBullCreatePayload(dto));

    // validate: true runs model-level validations on each item (Sequelize side)
    const created = await this.bullModel.bulkCreate(payload, {
      validate: true,
    });

    return {
      inserted: created.length,
    };
  }

  async list(query: BullsListQuery) {
    // Current page number from frontend (never below 1)
    const pageNumber = Math.max(1, Number(query.page ?? 1));
    // How many records per page (capped to avoid heavy queries)
    const pageSize = Math.min(50, Math.max(1, Number(query.limit ?? 10)));
    // How many rows to skip in SQL (OFFSET for pagination)
    const offset = (pageNumber - 1) * pageSize;

    // Raw SQL expression executed by the database (not JS), to avoid Node doing the math which would be slower
    const bullScoreExpression =
      '(crecimiento * 0.30) + (facilidad_parto * 0.25) + (reproduccion * 0.20) + (moderacion * 0.15) + (carcasa * 0.10)';

    // Base query config
    const queryOptions: FindAndCountOptions = {
      where: {},
      limit: pageSize,
      offset,
      attributes: {
        //literal() means that Sequelize will treat the string as a raw SQL expression
        include: [[literal(bullScoreExpression), 'bullScore']], // add computed column
      },
    };

    // Text search on ear tag or name
    if (query.search?.trim()) {
      const searchTerm = query.search.trim();
      queryOptions.where = {
        ...queryOptions.where,
        [Op.or]: [
          where(col('caravana'), { [Op.iLike]: `%${searchTerm}%` }),
          where(col('nombre'), { [Op.iLike]: `%${searchTerm}%` }),
        ],
      };
    }

    // Filters
    if (query.origen) {
      queryOptions.where = { ...queryOptions.where, origen: query.origen };
    }

    if (query.uso) {
      queryOptions.where = { ...queryOptions.where, uso: query.uso };
    }

    if (query.pelaje) {
      queryOptions.where = { ...queryOptions.where, pelaje: query.pelaje };
    }

    // Sort by computed score
    const sortOrder = query.sort ?? 'score_desc';
    queryOptions.order =
      sortOrder === 'score_asc'
        ? [[literal('"bullScore"'), 'ASC']]
        : [[literal('"bullScore"'), 'DESC']];

    // Query DB with pagination
    const { rows, count } = await this.bullModel.findAndCountAll(queryOptions);

    return {
      data: rows,
      page: pageNumber,
      limit: pageSize,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    };
  }
}
