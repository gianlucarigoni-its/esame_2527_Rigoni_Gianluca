import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  picture = input<string>();
  size = input(45);

  private failedUrl = signal<string | null>(null);

  showImage = computed(() => {
    const pic = this.picture();
    return !!pic && this.failedUrl() !== pic;
  });

  onError() {
    this.failedUrl.set(this.picture() ?? null);
  }
}
