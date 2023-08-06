import { Card, CardHeader, Typography } from "@material-tailwind/react";


export default function Verification() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h6" className="text-center" color="white">
            Email Was Sended Into Your register Email Please Verify!
          </Typography>
        </CardHeader>
      </Card>
    </div>
  );
}
