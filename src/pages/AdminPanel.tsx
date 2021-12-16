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

const handleTourSubmit = (e: any) => {
  e.preventDefault();
};

const AdminPanel = () => {
  const { filtered_tours, showFilters, stickyHeader } = useFilterContext();

  return (
    <section className="admin-panel" style={stickyHeader && { paddingTop: "5rem" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="tour-title">Tour Title</label>
          <input
            type="text"
            name="tour-title"
            minLength={5}
            maxLength={100}
            placeholder="City Walking Tour"
          />
          <label htmlFor="tour-city">City</label>
          <input
            type="text"
            name="tour-city"
            minLength={2}
            maxLength={32}
            placeholder="Dublin"
          />
          <label htmlFor="tour-country">Country</label>
          <input
            type="text"
            name="tour-country"
            minLength={3}
            maxLength={32}
            placeholder="Ireland"
          />
          <label htmlFor="tour-price">Tour Price</label>
          <input type="number" name="tour-price" min="5" max="10000" placeholder="70" />
          <label htmlFor="tour-length">Tour Length (Hours)</label>
          <input type="number" name="tour-length" min="0.5" max="168" step="0.5" />
          <label htmlFor="tour-rating">Tour Rating</label>
          <select name="tour-rating" id="tour-rating">
            <option value="none" selected>
              Please Select...
            </option>
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
              <label htmlFor="tour-guided">Guided Tour ?</label>
              <input type="checkbox" name="tour-guided" id="tour-guided" />
            </div>
            <div>
              <label htmlFor="tour-entrance-fees">Entrance Fees Included ?</label>
              <input type="checkbox" name="tour-entrance-fees" id="tour-entrance-fees" />
            </div>
          </div>
          <label htmlFor="tour-group-size">Group Size</label>
          <select name="tour-group-size" id="tour-group-size">
            <option value="none" selected>
              Please Select...
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <label htmlFor="tour-description">Tour Description</label>
          <textarea
            name="tour-description"
            id="tour-description"
            cols={40}
            rows={8}
            placeholder="Copper mug gastropub hoodie, banh mi 8-bit kombucha letterpress butcher DIY raw denim cornhole vaporware fam kale chips. VHS direct trade swag pug, 90's 8-bit pop-up hot chicken tacos before they sold out ennui leggings. Cray cronut gochujang, squid palo santo umami offal. Glossier humblebrag umami blue bottle vape small batch hella normcore disrupt celiac mumblecore. Vape meggings aesthetic lo-fi chambray hot chicken."
          />
          <label htmlFor="tour-image-url">Tour Image URL</label>
          <input
            type="text"
            name="tour-image-url"
            placeholder="https://www.travelimager.com/images/ireland/Ireland-Dublin-Dublin-Castle.jpg"
          />
          <label htmlFor="tour-image-alt">Tour Image Alt Desc. (Optional)</label>
          <input
            type="text"
            name="tour-image-alt"
            placeholder="Medieval stone exterior of the Dublin Castle, a major city attraction"
          />
          <input type="submit" onClick={(e) => handleTourSubmit(e)} />
        </div>
      </form>
    </section>
  );
};

export default AdminPanel;

// id: 1,
// name: "Cinque Terre Villages & The Italian Riviera",
// city: "Florence",
// country: "Italy",
// price: 13900,
// hours: 12,
// rating: 4.5,
// guided_tour: false,
// group_size: "medium",
// entrance_fees_included: true,
// description:

// image_url:

// image_alt:
