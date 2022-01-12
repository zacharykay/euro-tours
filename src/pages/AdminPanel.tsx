import axios from "axios";

import "../css/admin_panel.scss";

import { useFilterContext } from "../context/filter_context";
import { useUserContext } from "../context/user_context";
import LoginLogout from "../components/LoginLogout";

const dataUrl: string | undefined = process.env.API_DOMAIN;

const AdminPanel = () => {
  const { form_data, stickyHeader, handleFormData, clearFormData } = useFilterContext();
  const { myUser } = useUserContext();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (form_data.rating !== "none" && form_data.group_size !== "none") {
        if (form_data.image_alt === "") {
          form_data.image_alt =
            form_data.city + ", " + form_data.country + " Tour Attraction";
        }
        form_data.rating = parseFloat(form_data.rating);
        form_data.hours = parseFloat(form_data.hours);

        if (dataUrl) {
          axios.post(dataUrl, JSON.stringify(form_data), {
            headers: { "Content-Type": "application/json" },
          });
        } else {
          throw new Error("Data url was not defined");
        }

        clearFormData();
      }
    } catch (err) {
      console.log(err, form_data);
    }
  };

  return (
    <section className="admin-panel" style={stickyHeader && { paddingTop: "5rem" }}>
      <h2>Add a New Tour</h2>
      {!myUser && <p>(Muse be logged into Create)</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">Tour Title</label>
          <input
            type="text"
            name="name"
            minLength={5}
            maxLength={100}
            placeholder="City Walking Tour"
            value={form_data.name}
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
            value={form_data.city}
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
            value={form_data.country}
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
            value={form_data.price}
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
            value={form_data.hours}
            onChange={handleFormData}
            required
          />
          <label htmlFor="rating">Tour Rating</label>
          <select
            name="rating"
            value={form_data.rating}
            onChange={handleFormData}
            required
          >
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
              <input
                type="checkbox"
                name="guided_tour"
                checked={form_data.guided_tour}
                onChange={handleFormData}
              />
            </div>
            <div>
              <label htmlFor="entrance_fees_included">Entrance Fees Included ?</label>
              <input
                type="checkbox"
                name="entrance_fees_included"
                checked={form_data.entrance_fees_included}
                onChange={handleFormData}
              />
            </div>
          </div>
          <label htmlFor="group_size">Group Size</label>
          <select
            name="group_size"
            value={form_data.group_size}
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
            value={form_data.description}
            onChange={handleFormData}
            required
          />
          <label htmlFor="image_url">Tour Image URL</label>
          <input
            type="text"
            name="image_url"
            placeholder="https://www.travelimager.com/images/ireland/Ireland-Dublin-Dublin-Castle.jpg"
            value={form_data.image_url}
            onChange={handleFormData}
            required
          />
          <label htmlFor="image_alt">Tour Image Alt Desc. (Optional)</label>
          <input
            type="text"
            name="image_alt"
            placeholder="Medieval stone exterior of the Dublin Castle, a major city attraction"
            value={form_data.image_alt}
            onChange={handleFormData}
          />
          {myUser && <input id="submit-btn" type="submit" onClick={handleFormSubmit} />}
        </div>
      </form>
      {!myUser && <LoginLogout />}
    </section>
  );
};

export default AdminPanel;
