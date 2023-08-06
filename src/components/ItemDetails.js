import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodList from "../Data/ItemData";
import Navbars from "../components/Navbars";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";

const ItemDetails = () => {
  const itemId = useParams();
  const itemIdInNumber = parseInt(itemId.itemId);

  const [item, setItem] = useState({});

  useEffect(() => {
    const selectData = FoodList.filter((item) => {
      return item.productId === itemIdInNumber;
    });
    setItem(selectData);
  }, [itemIdInNumber]);

  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "Overview",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Order Online",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Reviews",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Photos",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Menu",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <>
      <Navbars />

      <div className="container mx-auto px-4">
        <div className="pl-[100px] pt-[80px] pb-[50px]">
          <Typography className="text-[25px] ">
            <b>The Tiffin Zone</b>
          </Typography>
          <Typography>North Indian, Gujarati, Chinese</Typography>
          <Typography>Location: Vejalpur, Ahmedabad</Typography>
          <Typography>Open now 10am - 12midnight (Today)</Typography>
        </div>

        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b  border-orange-400 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2  border-orange-400  shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-orange-500" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
};

export default ItemDetails;
