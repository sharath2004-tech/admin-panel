import * as Yup from "yup";

export const createPropertyValidationSchema = Yup.object().shape({
  name: Yup.string().required("property name is required"),
  images: Yup.array().min(1).required("at least one image is required."),
  videoTour: Yup.mixed().optional(),
  price: Yup.number().min(1).required("property price is required"),
  currency: Yup.string().required("property price type is required"),
  description: Yup.string().required("property description is required"),
  paymentDescription: Yup.string().required(
    "property payment description is required"
  ),
  propertyType: Yup.string().required("property type is required"),
  propertyHomeType: Yup.string().required("property Home type is required"),
  details: Yup.object().shape({
    area: Yup.number()
      .min(0, "area should be greater than one")
      .required("property area is required"),
    bedroom: Yup.number()
      .min(0, "bedroom should be greater than zero")
      .required("property bed room is required"),
    bathroom: Yup.number()
      .min(0, "bathroom should be greater than zero")
      .required("property bath room is required"),
    yearBuilt: Yup.number().required("property built year is required"),
    floor: Yup.number(),
  }),
  owner: Yup.string().required("propery owner is required"),
  agent: Yup.string().required("agent is required"),
  address: Yup.object().shape({
    city: Yup.string().optional().required("property location is required"),
    location: Yup.string().required("property location is required"),
    loc: Yup.array().required("property location is required"), //latitude and longitude
  }),
  isFeatured: Yup.boolean(),
  isFurnished: Yup.boolean().required("property status is required"),
  amenities: Yup.array().min(3).required("property Amenity is required"),
  facilities: Yup.array().of(
    Yup.object().shape({
      facility: Yup.string().required("facility is required"),
      distance: Yup.string().required("distance is required"),
    })
  ),
});

export const editPropertyValidationSchema = Yup.object().shape({
  name: Yup.string().required("property name is required"),
  images: Yup.array(),
  videoTour: Yup.mixed().optional(),
  price: Yup.number().min(1).required("property price is required"),
  currency: Yup.string().required("property price type is required"),
  description: Yup.string().required("property description is required"),
  paymentDescription: Yup.string().required(
    "property payment description is required"
  ),
  propertyType: Yup.string().required("property type is required"),
  propertyHomeType: Yup.string().required("property Home type is required"),
  details: Yup.object().shape({
    area: Yup.number()
      .min(0, "area should be greater than one")
      .required("property area is required"),
    bedroom: Yup.number()
      .min(0, "bedroom should be greater than zero")
      .required("property bed room is required"),
    bathroom: Yup.number()
      .min(0, "bathroom should be greater than zero")
      .required("property bath room is required"),
    yearBuilt: Yup.number().required("property built year is required"),
    floor: Yup.number(),
  }),
  owner: Yup.string().required("propery owner is required"),
  agent: Yup.string().required("agent is required"),
  address: Yup.object().shape({
    city: Yup.string().optional(),
    location: Yup.string(),
    loc: Yup.array(), //latitude and longitude
  }),
  isFeatured: Yup.boolean(),
  isFurnished: Yup.boolean().required("property status is required"),
  amenities: Yup.array().min(3).required("property Amenity is required"),
  facilities: Yup.array().of(
    Yup.object().shape({
      facility: Yup.string().required("facility is required"),
      distance: Yup.string().required("distance is required"),
    })
  ),
});
