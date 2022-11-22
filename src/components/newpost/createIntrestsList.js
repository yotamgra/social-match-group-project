fetch("./intrestsList.txt",{headers: {
    'Content-Type': 'text/plain'
  }
})
  .then((res) => res.text())
  .then((data) => {
const intrestsList = data.split(/\r?\n/);
  });
