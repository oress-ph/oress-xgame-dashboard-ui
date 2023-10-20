import { Component, OnInit, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LayoutService } from "../../services/layout.service";
import { ChatService } from "../../services/chat.service";
import { ChatUsers } from "../../model/chat.model";
import { ChatBotModel } from './../../model/chatbot.model';
import { DatePipe } from '@angular/common';
import { ChatBotService } from "../../services/chatbot.service";

@Component({
  selector: "app-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"],
})
export class CustomizerComponent implements OnInit {
  public screenwidth: any = window.innerWidth;
  public customizer: string = "";
  public layoutType: string = "ltr";
  public sidebarType: string = "compact-wrapper";
  public sidebarSetting: string = "default-sidebar";
  public MIXLayout: string = "default";
  public icon: string = "stroke-svg";

  public primary_color: string = "#7366ff";
  public secondary_color: string = "#f73164";

  public chats : any;
  public chatUser : any;
  public users : ChatUsers[] = []
  public searchUsers : ChatUsers[] = []
  public openTab : string = "call";
  public chatText : string;
  public error : boolean = false;
  public profile : any;
  public mobileToggle: boolean = false;
  public showEmojiPicker:boolean = false;
  public id : any;

  chat_text: string = '';
  chatBotModel: ChatBotModel[] = [];
  loading: boolean = false;

  constructor(
    private modalService: NgbModal, 
    public layout: LayoutService,
    private chatService: ChatService,
    private datePipe: DatePipe,
    private chatBotService: ChatBotService
  ) {
    this.chatService.getUsers().subscribe(users => { 
      this.searchUsers = users
      this.users = users
    })
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenwidth = event.target.innerWidth;
  }

  ngOnInit() {
  }
    
  chat_bot_send(){
    this.loading = true;
    this.chatBotModel.push({
      send_text: this.chat_text,
      send_date_time: this.datePipe.transform(new Date(), 'hh:mm a')
    })
    this.chatBotService.send_chatbot(this.chat_text).subscribe((response: any) => {
      let result = response;
      if (result[0] === true) {
        this.chatBotModel.push({
          receive_text: result[1].message,
          receive_date_time: this.datePipe.transform(new Date(), 'hh:mm a')
        })
        console.log(this.chatBotModel);
        this.loading = false;
        this.chat_text = '';
      } else {

      }
    })
  }


  // Open Modal
  openModal(popup) {
    this.modalService.open(popup, { backdropClass: "dark-modal", centered: true });
  }

  // Open customizer
  Customizer(val) {
    this.customizer = val;
  }
  

  // Customize Layout Type
  customizeLayoutType(val) {
    this.layoutType = val;
    this.layout.config.settings.layout_type = val;
    if (val == "rtl") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "rtl";
    } else if (val == "box-layout") {
      document.getElementsByTagName("html")[0].setAttribute("dir", val);
      document.body.className = "box-layout";
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("dir");
      document.body.className = "";
    }
  }

  svgIcon(val: string) {
    this.icon = val;
    this.layout.config.settings.icon = val;
    if (val == "stroke-svg") {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", val);
    } else {
      document.getElementsByTagName("sidebar-wrapper")[0]?.setAttribute("icon", val);
    }
  }

  // Customize Sidebar Type
  customizeSidebarType(val) {
    this.sidebarType = val;
    this.layout.config.settings.layout = val;
  }

  // Customize Mix Layout
  customizeMixLayout(val) {
    this.MIXLayout = val;
    this.layout.config.settings.layout_version = val;
    document.body?.classList.remove("light-only", "dark-sidebar", "dark-only");
    document.body.classList.add(val);
    if (val === "default") {
      document.body?.classList.add("light-only");
    } else if (val === "dark-sidebar") {
      document.body?.classList.add("dark-sidebar");
    } else {
      document.body?.classList.add("dark-only");
    }
  }

}
