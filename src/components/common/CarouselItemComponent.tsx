import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const CarouselItemComponent = ({ url, index }) => {
  return (
    <CarouselItem key={index}>
      <div className="p-1">
        <Card>
          <CardContent className="p-0 w-full h-[400px] flex items-center justify-center">
            <img
              src={url}
              alt="Students learning online"
              className="w-full h-full object-cover rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default CarouselItemComponent;
