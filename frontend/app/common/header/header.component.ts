import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isJobSeekerLoggedIn = false;
  isEmployerLoggedIn = false;
  isAdminLoggedIn = false;

  loginModal: BsModalRef | null;
  registerModal: BsModalRef | null;

  notifications = [
    "Asim has applied to your posted job id 1233",
    "Arif sent cv at job id 1002"
  ];
  userName = "Asad";

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openJobSeekerLoginModal(template: TemplateRef<any>) {
    this.loginModal = this.modalService.show(template, { class: "modal-sm" });
  }

  openJobSeekerRegisterModal(template: TemplateRef<any>) {
    this.registerModal = this.modalService.show(template, {
      class: "modal-sm"
    });
  }

  closeJobSeekerLoginModal() {
    if (!this.loginModal) {
      return;
    }

    this.loginModal.hide();
    this.loginModal = null;
  }

  closeJobSeekerRegisterModal() {
    if (!this.registerModal) {
      return;
    }

    this.registerModal.hide();
    this.registerModal = null;
  }
}
