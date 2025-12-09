export type Query<E> = {
  [P in keyof E]?: E[P] | E[P][];
} & {
  _like?: Partial<Record<keyof E, string>>; // LIKE %val%
  _range?: Partial<Record<keyof E, { from: any; to: any }>>;
  _order?: { by: keyof E; dir: 'ASC' | 'DESC' };
  _limit?: number;
  _offset?: number;
};
