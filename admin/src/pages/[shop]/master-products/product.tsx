import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useEffect ,Fragment,useState , useRef,useCallback} from "react";
import { useCreateProductMutation } from "@data/master-products/master-product-create.mutation";

export default function Product({product,shopId,masterIds,taxes}:any) {
    const { mutate: createProduct, isLoading: creating } = useCreateProductMutation();
    const [alreayMade,setAlreadyMade]=useState(false);

    useEffect(()=>{
        if(masterIds?.includes(product?.id)){
            setAlreadyMade(true);
        }
    })


   // const tx = product?.tax
    // const taxArray = tx?.split(',');
    // get tax name
    // const taxName = product.tax ?  taxArray?.[6].split(':')[1].replace('"','').replace('"','') + ' ' + taxArray?.[5].split(':')[1].replace('"','').replace('"','') + '%' : '';

    

    // console.log('shop master product',product);

    function addProduct():any{
        // console.log(product?.id);
        const price = document.getElementById("price_"+product?.id)?.value as any;
        const sale_price = document.getElementById("sale_price_"+product?.id)?.value as any;
        const quantity = document.getElementById("quantity_"+product?.id)?.value as any;
        const tax = document.getElementById("tax_"+product?.id?.value) as any;
        if(price&&sale_price){
            createProduct(
                {
                    shop_id:shopId,
                    price:price,
                    master_id:product?.id,
                    quantity:quantity,
                    tax:tax,
                    sale_price:sale_price,
                    // tax:tax
                },
                {
                    onSuccess:()=>{
                        setAlreadyMade(true);
                    },
                    onError: (error: any) => {
                        // console.log(error);
                    },
                }
            );
        }
    }

    if(alreayMade){
        return ("");
    }

    return (
        <>          
            <tr data-row-key="542" className="rc-table-row rc-table-row-level-0 h-24 `text-center`">
                <td className="rc-table-cell text-center">
                    <div style={{boxSizing: "border-box", display: "inline-block", position: "relative", width: "60px", height: "auto"}}>
                        <img alt={product?.name} src={product?.image?.thumbnail ?product?.image?.thumbnail:''} decoding="async" className="rounded overflow-hidden"/>
                    </div>
                </td>
                <td title="cosmos" className="rc-table-cell rc-table-cell-ellipsis text-xs  text-center">{product?.name}</td>
                
                <td className="rc-table-cell  text-center" >
                    <span className="whitespace-nowrap" title={"$"+product?.price}>
                        <Input
                            name="price"
                            variant="outline"
                            // value={('₹' + ' ' + product?.price)}
                            
                            className="mb-5"
                            placeholder={product?.price}
                            id={"price_"+product?.id}
                        />
                    </span>
                </td>

                <td className="rc-table-cell text-center" >
                    <Input
                        name="sale_price"
                        variant="outline"
                        // value={'₹' + ' ' + (product?.sale_price === null  ? product?.price : product?.sale_price)}
                        
                        placeholder={product?.sale_price}
                        className="  mb-5"
                        id={"sale_price_"+product?.id}
                    />
                </td>
                
                <td className="rc-table-cell text-center" >
                    <span className="whitespace-nowrap" title={"$"+product?.quantity}>
                        
                    <Input
                        name="quantity"
                        variant="outline"
                        // value={ product?.quantity}
                        className="mb-5"
                        placeholder={product?.quantity}
                        id={"quantity_"+product?.id}
                    />
                    </span>
                </td>

                
                {/* <td className="rc-table-cell text-center" >
                    <span className="whitespace-nowrap" title={"$"+product?.tax}>
                    <Input
                        name="tax"
                        variant="outline"
                        value={taxName}
                        className="mb-5"
                        placeholder="tax"
                        id={"tax_"+product?.id}
                    />
                    
                    
                    </span>
                </td> */}


                {/* <td className="rc-table-cell text-center" >
                    <span className="whitespace-nowrap">
                    <select
                        style={{
                            fontSize: "0.875rem",
                            color: "#6B7280",
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 12,
                            paddingBottom: 12,
                            cursor: "pointer",
                            backgroundColor:"#ffffff",
                            width:"100%",
                            boxShadow:"0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)",
                            borderBottom: "1px solid #E5E7EB"
                        }}
                        name="tax"
                        className="border border-border-base focus:border-accent h-12 mb-2"
                        id={"tax_"+product?.id} >
                            {
                                taxes?.map((tax:any)=>{
                                    return (
                                        <option value={'hh'} selected>
                                            {tax?.name+" "+tax?.rate+"%"}
                                        </option>
                                    )
                                })
                            }
                    </select>
                    </span>
                </td> */}

                
                <td className="rc-table-cell text-center" >
                    <div className="space-s- w-10 inline-flex items-center ">
                        <Button
                            variant="outline"
                            onClick={addProduct}
                            className="mr-4 mb-2 w-4"
                            type="button"
                        >
                            Add
                        </Button>
                    </div>
                </td>
            </tr>
        </>
    );
}

