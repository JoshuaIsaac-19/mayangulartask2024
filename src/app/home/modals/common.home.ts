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
  txt_taskName: string,
  txt_description:string,
  txt_status:string,
  txt_priority:string,
  date_dueDate:Date,
  isDeleted:boolean,
  date_createdAt:Date,
  date_modifiedAt:Date
}

export interface TaskStructure{
  id: number,
  taskName:string,
  description: string,
  status:string,
  priority:string,
  dueDate:Date
}

export interface AddTaskResponse{
  success: boolean,
  details: RawTaskStructure
}

//getAllTasksInterface
export interface GetAllTasks{
  success: boolean,
  details:{
    count:number,
    rows:RawTaskStructure[]
  }
}