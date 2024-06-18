export interface ProductList{
  id:number,
  name:string,
  description:string,
  price:number 
}

export interface getProductList{
  productList:getProductListValues,
  success:boolean
}

export interface getProductListValues{
  count:number,
  rows: ProductList[]
}

export interface EventValue{
  label:string,
  value:string
}

export interface EditedDataValue{
  description:string,
  price:string
}

export interface UpdatedDataResponse{
  success:boolean,
  updateStatus: boolean
}

export interface AddProductResponse{
  success: boolean,
  productDetails: ProductList
}

export interface DeletedProductResponse{
  success:boolean,
  deleteStatus:boolean
}

export interface RawTaskStructure{
  id: number,
  userId:number,
  taskName: string,
  description:string,
  status:string,
  priority:string,
  dueDate:Date,
  isDeleted:boolean,
  createdAt:Date,
  modifiedAt:Date
}

export interface TaskStructure{
  id: number,
  taskName:string,
  description: string,
  status:string,
  priority:string,
  dueDate:Date
}