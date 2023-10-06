import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  public config = {
    settings: {
      layout: 'horizontal-wrapper',
      layout_type: "ltr",
      layout_version: "dark-only",
      icon: "stroke-svg",
    },
    color: {
      primary_color: '#0ffeff',
      secondary_color: '#30c6f8'
    }
  };

  constructor() {
    if (this.config.settings.layout_type == "rtl") document.getElementsByTagName("html")[0].setAttribute("dir", this.config.settings.layout_type);

    document.documentElement.style.setProperty("--theme-deafult", this.config.color.primary_color);
    document.documentElement.style.setProperty("--theme-secondary", this.config.color.secondary_color);
    var primary = localStorage.getItem("primary_color") || this.config.color.secondary_color;
    var secondary = localStorage.getItem("secondary_color") || this.config.color.secondary_color;
    this.config.color.primary_color = primary;
    this.config.color.secondary_color = secondary;
    localStorage.getItem("primary_color") || this.config.color.primary_color;
    localStorage.getItem("secondary_color") || this.config.color.secondary_color;
    if ((this.config.settings.layout_version = "dark-only")) {
      document.body.classList.toggle("dark-only");
    }else{
      document.body.remove;
    }
  }

  setColor(primary_color, secondary_color) {
    this.config.color.primary_color = primary_color;
    this.config.color.secondary_color = secondary_color;
    localStorage.setItem("primary_color", this.config.color.primary_color);
    localStorage.setItem("secondary_color", this.config.color.secondary_color);
    window.location.reload();
  }

  resetColor() {
    document.documentElement.style.setProperty("--theme-deafult", this.config.color.primary_color);
    document.documentElement.style.setProperty("--theme-secondary", this.config.color.secondary_color);
    (<HTMLInputElement>document.getElementById("ColorPicker1")).value = this.config.color.primary_color;
    (<HTMLInputElement>document.getElementById("ColorPicker2")).value = this.config.color.secondary_color;
    localStorage.setItem("primary_color", "#7366ff");
    localStorage.setItem("secondary_color", " #f73164");
    window.location.reload();
  }
}
