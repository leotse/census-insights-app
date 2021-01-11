import { randomLocation } from "../../services/location";

export default (req, res) => {
  console.log(res.status);
  res.status(200).json(randomLocation());
};
