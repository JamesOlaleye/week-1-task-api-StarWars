function main() {
  const ul = document.querySelector('ul');

  const [img, name, height, gender, button] =
    document.querySelectorAll('.details>*');
  const [sec1, sec2] = document.querySelectorAll('.main, .details');
  button.addEventListener('click', () => {
    sec1.classList.remove('hide');
    sec2.classList.add('hide');
  });
  //   console.log(name, height, gender);

  fetchAPI();
  async function fetchAPI() {
    let request = new Request('https://swapi.dev/api/people');
    let response = await fetch(request);
    let data = await response.json();
    // console.log(data.results);

    while (data.next !== null) {
      populateAppHome(data);

      request = new Request(data.next);
      response = await fetch(request);
      data = await response.json();

      //   console.log(data.next);
    }
  }

  function populateAppHome(data) {
    data.results.forEach((character) => {
      //perform something
      //   console.log(character.name);
      const li = document.createElement('li');
      li.innerHTML = character.name;
      ul.append(li);
      //add event listeners
      li.addEventListener('click', () => {
        displayInfo(character);
      });
    });
  }

  //
  function displayInfo(character) {
    // console.log(character.name);
    name.innerHTML = character.name;
    height.innerHTML = character.height;
    gender.innerHTML = character.gender;

    sec1.classList.add('hide');
    sec2.classList.remove('hide');
  }
}

main();
//module.exports = { main };
