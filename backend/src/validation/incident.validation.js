const { z } = require("zod");

const incidentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  type: z.enum(
    ["THEFT", "FIRE", "VANDALISM", "ACCIDENT"],
    "Invalid incident type",
  ),
  latitude: z
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    })
    .refine(
      (lat) => lat >= -90 && lat <= 90,
      "Latitude must be between -90 and 90",
    ),
  longitude: z
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    })
    .refine(
      (lng) => lng >= -180 && lng <= 180,
      "Longitude must be between -180 and 180",
    ),
});

module.exports = {
  incidentSchema,
};
