import { CollectionModel } from '../models/collection.model';

export async function seedCollections(): Promise<void> {
  const count = await CollectionModel.count();
  if (count > 0) {
    return;
  }

  await CollectionModel.bulkCreate([
    {
      name: 'Primavera-Verano',
      description: 'Colección de temporada primavera-verano',
      isActive: true,
    },
    {
      name: 'Otoño-Invierno',
      description: 'Colección de temporada otoño-invierno',
      isActive: true,
    },
  ]);
}
