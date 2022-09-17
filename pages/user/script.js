const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user = urlParams.get("user");
const BASE_URL = "https://api.hnpwa.com/v0/user";

const getUserDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${user}.json`);

    const displayUserData = (data) => {
      console.log(data);
      let section = document.createElement("section");

      let user = document.createElement("p");
      user.innerText = `User: ${data.id}`;

      let created = document.createElement("p");
      created.innerText = `created: ${data.created}`;

      let karma = document.createElement("p");
      karma.innerText = `karma: ${data.karma}`;

      section.appendChild(user);
      section.appendChild(created);
      section.appendChild(karma);

      document.querySelector(".user-content").appendChild(section);
    };

    return displayUserData(response.data);
  } catch (error) {
    console.log(error);
  }
};

getUserDetails();
