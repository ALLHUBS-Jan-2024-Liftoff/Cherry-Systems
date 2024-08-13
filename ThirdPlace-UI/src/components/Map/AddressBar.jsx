import.meta.env.GOOGLE_MAPS_API_KEY;

export default function AddressBar() {
  const handleSubmit = (event) => {
    
  }


  return (
    <>
      <div className="review-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Address <br></br>
              <input name="locationAddress" />
            </label>
          </div>
          <input
            type="submit"
            className="submit-button"
            value="Submit Location"
          />
        </form>
      </div>
    </>
  );
}
