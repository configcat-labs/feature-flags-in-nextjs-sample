import * as configcat from "configcat-js-ssr";

// This runs on the server on each request
export async function getServerSideProps() {
  // Initialize ConfigCatClient with your SDK Key:
  const configCatClient = configcat.createClient(
    "fK7ZCApWbkaDu14njPKZQw/vBw-jxALN0eiWNilfwboGA"
  );

  // Check for the state of the feature flag
  const randomUserFlag = await configCatClient.getValueAsync(
    "randomuserflag",
    false
  );
  console.log(randomUserFlag);
  // Fetch random user data from external API
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  // Return flag's state and dat to page via props
  return { props: { randomUserFlag, data: data.results } };
}

// Page Component
export default function Home({ data, randomUserFlag }) {
  // Extract the required user details
  const firstName = data[0].name.first;
  const lastName = data[0].name.last;
  const image = data[0].picture.large;
  const gender = data[0].gender;
  const location = data[0].location.country;

  // Page Template
  return (
    <>
      {randomUserFlag && (
        <div className='card'>
          <img src={image} class={gender} />
          <h2>{`${firstName} ${lastName}`}</h2>
          <p>
            <span>Gender: </span> {gender}
          </p>
          <p>
            <span>Location: </span>
            {location}
          </p>
        </div>
      )}
      {!randomUserFlag && <p>Feature has been toggled off</p>}
    </>
  );
}
