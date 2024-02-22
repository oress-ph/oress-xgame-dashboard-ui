import { Component, OnInit, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LayoutService } from "../../services/layout.service";
import { ChatService } from "../../services/chat.service";
import { ChatUsers } from "../../model/chat.model";
import { ChatBotModel } from './../../model/chatbot.model';
import { DatePipe } from '@angular/common';
import { ChatBotService } from "../../services/chatbot.service";
import { AppSettings } from "src/app/app-settings";
import { CookiesService } from "../../services/cookies.service";

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
  is_new_message : boolean = false;
  receivedMessages: string[] = [];
  constructor(
    private modalService: NgbModal, 
    public layout: LayoutService,
    private chatService: ChatService,
    private datePipe: DatePipe,
    private chatBotService: ChatBotService,
    public appSettings:AppSettings,
    private cookiesService: CookiesService
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
    this.chatBotService.connect();
    // this.chatBotService.messageReceived.subscribe((message: string) => { 
    //   if (this.is_new_message == true) {
    //     this.chatBotModel.push({
    //       text: "",
    //       date: new Date(),
    //       reply: false,
    //     });

    //     this.is_new_message = false;
    //   }

    //   let length = this.chatBotModel.length;
    //   let last_chat = this.chatBotModel[length - 1];
    //   last_chat.text += message;

    //   this.loading = false;
    // });
  }
  public chat_bot_send() {
    this.loading = true;
    this.chatBotModel.push({
      reply: true,
      text: this.chat_text,
      date: this.datePipe.transform(new Date(), 'hh:mm a')
    });
    this.postChatBot()
  }
  public postChatBot(){
    this.is_new_message = true;
    this.chatBotModel.push({
      text: "",
      date: this.datePipe.transform(new Date(), 'hh:mm a'),
      reply: false,
    });

    this.chatBotService.sendMessage(this.chat_text, this.cookiesService.getCookieArray('language').code, (response) => {
      const lastChatMessage = this.chatBotModel[this.chatBotModel.length - 1];
      lastChatMessage.text += response; // Replace with the text you want
      this.loading = false; // Set loading to false when response is received
    }, () => {
      this.loading = false; // Set loading to false in case of no response or error
    });
    
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
