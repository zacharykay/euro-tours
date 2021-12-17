import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "../css/admin_panel.scss";

import { useFilterContext } from "../context/filter_context";

interface TourData {
  id: string | Number;
  name: string;
  city: string;
  country: string;
  price: number;
  hours: number;
  rating: number;
  guided_tour: boolean;
  group_size: string;
  entrance_fees_included: boolean;
  description: string;
  image_url: string;
  image_alt?: string;
}

interface FormData {
  "tour_title": string;
  "tour_city": string;
  "tour_country": string;
  "tour_price": number;
  "tour_length": number;
  "tour_rating": string;
  "tour_guided": string;
  "tour_entrance_fees": string;
  "tour_group_size": string;
  "tour_description": string;
  "tour_image_url": string;
  "tour_image_alt": string | undefined;
}

const dataUrl: string = "http://localhost:4000/api";

const AdminPanel = () => {
  const { filtered_tours, showFilters, stickyHeader } = useFilterContext();

  const [ formData, setFormData ]: any = useState({
    rating: "none",
    guided_tour: false,
    entrance_fees_included: false,
    group_size: "none",
    img_alt: "",
  });

  const handleFormData = (e: any) => {
    if (e.target.name === "entrance_fees_included" || e.target.name === "guided_tour") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (formData.rating !== "none" && formData.group_size !== "none") {
      if (!formData.img_alt) {
        formData.img_alt = formData.city + ", " + formData.country + " Tour Attraction";
      }
      formData.id = uuidv4();
      formData.price = formData.price * 100;
      formData.rating = parseFloat(formData.rating);
      formData.hours = parseFloat(formData.hours);

      axios.post(dataUrl, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      });
      console.log("SUCCESS");
      console.log("formDATA", formData);
    } else {
      console.log("FAILURE");
    }
  };

  return (
    <section className="admin-panel" style={stickyHeader && { paddingTop: "5rem" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">Tour Title</label>
          <input
            type="text"
            name="name"
            minLength={5}
            maxLength={100}
            placeholder="City Walking Tour"
            onChange={handleFormData}
            required
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            minLength={2}
            maxLength={32}
            placeholder="Dublin"
            onChange={handleFormData}
            required
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            minLength={3}
            maxLength={32}
            placeholder="Ireland"
            onChange={handleFormData}
            required
          />
          <label htmlFor="price">Tour Price</label>
          <input
            type="number"
            name="price"
            min="5"
            max="10000"
            placeholder="70"
            onChange={handleFormData}
            required
          />
          <label htmlFor="hours">Tour Length (Hours)</label>
          <input
            type="number"
            name="hours"
            min="0.5"
            max="168"
            step="0.5"
            onChange={handleFormData}
            required
          />
          <label htmlFor="rating">Tour Rating</label>
          <select name="rating" defaultValue="none" onChange={handleFormData} required>
            <option value="none">Please Select...</option>
            <option value="1">1 Star</option>
            <option value="1.5">1.5 Stars</option>
            <option value="2">2 Stars</option>
            <option value="2.5">2.5 Stars</option>
            <option value="3">3 Stars</option>
            <option value="3.5">3.5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="4.5">4.5 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div className="checkbox-flexbox">
            <div>
              <label htmlFor="guided_tour">Guided Tour ?</label>
              <input type="checkbox" name="guided_tour" onChange={handleFormData} />
            </div>
            <div>
              <label htmlFor="entrance_fees_included">Entrance Fees Included ?</label>
              <input
                type="checkbox"
                name="entrance_fees_included"
                onChange={handleFormData}
              />
            </div>
          </div>
          <label htmlFor="group_size">Group Size</label>
          <select
            name="group_size"
            defaultValue="none"
            onChange={handleFormData}
            required
          >
            <option value="none">Please Select...</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <label htmlFor="description">Tour Description</label>
          <textarea
            name="description"
            id="description"
            cols={40}
            rows={8}
            placeholder="Copper mug gastropub hoodie, banh mi 8-bit kombucha letterpress butcher DIY raw denim cornhole vaporware fam kale chips. VHS direct trade swag pug, 90's 8-bit pop-up hot chicken tacos before they sold out ennui leggings. Cray cronut gochujang, squid palo santo umami offal. Glossier humblebrag umami blue bottle vape small batch hella normcore disrupt celiac mumblecore. Vape meggings aesthetic lo-fi chambray hot chicken."
            onChange={handleFormData}
            required
          />
          <label htmlFor="image_url">Tour Image URL</label>
          <input
            type="text"
            name="image_url"
            placeholder="https://www.travelimager.com/images/ireland/Ireland-Dublin-Dublin-Castle.jpg"
            onChange={handleFormData}
            required
          />
          <label htmlFor="image_alt">Tour Image Alt Desc. (Optional)</label>
          <input
            type="text"
            name="image_alt"
            placeholder="Medieval stone exterior of the Dublin Castle, a major city attraction"
            onChange={handleFormData}
          />
          <input type="submit" onClick={handleFormSubmit} />
        </div>
      </form>
    </section>
  );
};

export default AdminPanel;
