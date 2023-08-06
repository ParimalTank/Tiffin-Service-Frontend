import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  // Button,
  // Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  // BanknotesIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import FoodList from "../Data/ItemData";

export default function Cards() {
  return (
    <>
      <h1 className="text-[30px] text-center pt-[35px]">
        Order Your Favorite Food Now
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {FoodList.map((result) => {
          return (
            <a href={`/items/${result.productId}`} id={result.productId}>
              <button>
                <Card className="w-full max-w-[20rem]  m-5 shadow-lg border-blue-gray-400 transition duration-150 ease-out hover:ease-in">
                  <CardHeader floated={false} color="white">
                    <img
                      src={result.imgUrl}
                      // className="max-h-[255px]"
                      className="h-[250px] w-[450px] object-fill"
                      alt="ui/ux review check"
                    />
                    <div className="">
                      <Typography className=" bg-blue-700 text-white">
                        {result.discount}% off up to 100
                      </Typography>
                      <Typography>Time {result.time} min</Typography>
                    </div>
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full  from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full"
                    >
                      <HeartIcon className="h-6 w-6" />
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {result.restaurantName}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                      >
                        <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        5.0
                      </Typography>
                    </div>
                    <Typography color="gray" className="flex justify-between">
                      <div>{result.itemName}</div>
                      <div>
                        <b>{result.itemPrice}₹ for ones</b>
                      </div>
                    </Typography>
                  </CardBody>

                  {/* <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true} className="bg-yellow-700">
          Add To Cart
          </Button>
        </CardFooter> */}
                </Card>
              </button>
            </a>
          );
        })}
      </div>
    </>
  );
}
