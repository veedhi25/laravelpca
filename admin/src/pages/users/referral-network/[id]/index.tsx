
import Navbar from "@components/layout/navbar/navbar";
import DefaultLayout from "@components/layout/default-layout";
import Footer from "@components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
// import ProfileSidebar from "@components/profile/profile-sidebar";
import { useEffect ,useLayoutEffect} from "react";
import { InvitedUsers } from '@settings/site.settings';
import {Tree} from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import {useReferralNetworkQuery} from '@data/user/use-referral-network-query'
import { useRouter } from "next/router";
import { AnimatedTree } from 'react-tree-graph';
import Layout from "@components/layouts/admin";
import { ArrowPrev } from "@components/icons/arrow-prev";
import Link from 'next/link';
// import { NodeLabel } from 'react-tree-graph';


  const ReferralNetwork = () => {

    const { query } = useRouter();
    
    const { data } = useReferralNetworkQuery(query?.id);

  
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
              if(data?.size>50){
                var initial_height=1500
              }else{
                var initial_height=4000
              }
            var new_width=(window.innerWidth>=1000)?800:window.innerWidth-10;
            var new_height=(window.innerHeight>=3000)?initial_height:window.innerHeight-10;
  

            setSize([new_width, new_height]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    
    const [width, height] = useWindowSize();

    console.log('node',data?.data)

    const getNodeProps = ({ node }:any) => {

        console?.log('node color',node)
        let color = "#888"; // default color
        if (node.is_active === 1) {
          color = "#3c763d"; // green color for is_active=1
        } else if (node.is_active === 0) {
          color = "#a94442"; // red color for is_active=0
        }
        return {
          style: { fill: color }
        };
      };

    return (  

        <div className='bg-gray-100'>

                <div className='flex flex-col mx-4 sm:mx-10'>
                    
                    <div className="flex items-start space-x-0 lg:space-x-10 justify-between w-full"> 
                        <Link href={'/users'}>
                        <span className="flex items-center cursor-pointer">
                            <ArrowPrev className='h-8 w-8'/>
                            Back
                        </span>
                        </Link>

                        <div className=" flex flex-col">
                            <span className="text-gray-800">
                                {data?.data?.name}
                            </span>
                            <div className="flex space-x-2 text-gray-900">
                                <p className=" w-20">Active -</p>
                                <span className=" text">{data?.data?.children?.filter((node)=>node?.is_active == 1).length}</span> 
                            </div>
                            <div className="flex space-x-2 text-gray-500">
                                <p className=" w-20">Inactive -</p>
                                <span className="text-redf-700 text">{data?.data?.children?.filter((node)=>node?.is_active == 0).length}</span> 
                            </div>
                        </div>
                         
                    </div>

                     
 
                    <div className="flex flex-col justify-evenly bg-white overflow-y-scroll min-h-screen lg:h-auto p-4 w-screen  border  mt-14" style={{backgroundColor:"#c3dbbf"}}>
                    {
                        data?.data && (
                            <Tree
                            data={data?.data}
                            height={data?.size}
                            key={data?.id}
                            width={width}
                            svgProps={{
                                className: 'custom'
                            }}
                            nodeLabelComponent={{
                                render: <NodeLabel />,
                                foreignObjectWrapper: {
                                    y: 24,
                                    width: 180,
                                    className: (node) => node.data.is_active ? 'active' : 'inactive'
                                }
                            }}
                        />
                        
                          
                        )
                    }
                    </div>
                </div>

            <Footer/>
            
        </div>
    )
}

export default ReferralNetwork;

ReferralNetwork.Layout = Layout;



export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common", "form"])),
    },
  });
  


  const NodeLabel = ({ nodeData }:any) => {
    return (
      <div>
        <p>{nodeData.name}</p>
        <p>{nodeData.is_active}</p>
      </div>
    );
  };
  
