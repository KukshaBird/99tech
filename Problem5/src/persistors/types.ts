/**
 * This interface should be implemented for any persistor class (DB/file/third-party requests)
 */
export interface BasePersistor<ModelType extends { id: number }> {
  fetch(filters?: Partial<ModelType>): Promise<ModelType[]>;
  create(data: Omit<ModelType, 'id'>): Promise<ModelType>;
  update(
    data: Partial<ModelType> & { id: ModelType['id'] },
  ): Promise<ModelType>;
  delete(id: ModelType['id']): Promise<void>;
  fetchOne(id: ModelType['id']): Promise<ModelType>;
}
