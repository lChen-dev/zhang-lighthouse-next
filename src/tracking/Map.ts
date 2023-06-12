import { sendTrack } from '@utils/analytics';

export default class Map {
  public static initCallOnServer(): void {
    sendTrack('Map called on server', {
      category: 'map',
      action: 'mapPageInitCallOnServer',
    });
  }

  public static loaded(): void {
    sendTrack('Map Page Opened', {
      category: 'map',
      action: 'mapPageLoaded',
    });
  }

  public static onSearch(value: string): void {
    if (value) {
      sendTrack('Insurance Add A Policy', {
        category: 'map',
        action: 'searchQuery',
        searchQueryString: value,
      });
    }
  }
}
