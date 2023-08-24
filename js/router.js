export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
        const pageName = pathname === "/" ? "home" : pathname.slice(1);
        this.updateBackground(pageName);
      });
  }

  updateBackground(pageName) {
    const pageBackgrounds = {
      home: "url('../assets/mountains-universe-1.png')",
      universe: "url('../assets/mountains-universe02.png')",
      exploration: "url('../assets/mountains-universe-3.png')",
    };
    document.body.style.backgroundImage = pageBackgrounds[pageName];
  }
}

export default new Router();



