export class ProfileCtrlComponent {
  user;
  constructor(ProfileService) {
    ProfileService.get(1).then(function (response) {
      this.user = response.data;
    });

  }
}
