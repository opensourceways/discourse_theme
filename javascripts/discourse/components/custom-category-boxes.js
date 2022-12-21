import Component from '@ember/component';
import discourseComputed from 'discourse-common/utils/decorators';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'div',
  router: service(),
  classNames: ['custom-category-boxes-main'],
  classNameBindings: ['noneSelected:none-selected'],
  _allowedCategories(selectedCategories) {
    // filters categories to only include selected categories for each section
    try {
      let availableCategories = this.site?.categories?.filter((category) => {
        if (selectedCategories.indexOf(category.id) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      console.log('availableCategories', availableCategories);
      return availableCategories;
    } catch (error) {
      console.log(error);
    }
  },
  @discourseComputed()
  shouldRenderHeadings() {
    if (
      settings.first_categories ||
      settings.second_categories ||
      settings.third_categories ||
      settings.fourth_categories ||
      settings.fifth_categories ||
      settings.sixth_categories
    ) {
      console.log(settings);
      return true;
    } else {
      return false;
    }
  },
  @discourseComputed('router.currentRouteName')
  shouldDisplay() {
    try {
      if (
        this?.router?.currentRoute?.name?.includes('discovery.') ||
        this?.router?.currentRoute?.name?.includes('tag.')
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },
  @discourseComputed()
  noneSelected() {
    return this.router.currentRoute.name.includes('None');
  },
  @discourseComputed()
  currentURL() {
    return this.router.currentURL;
  },
  @discourseComputed()
  firstCategories() {
    return this._allowedCategories(
      settings.first_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  secondCategories() {
    return this._allowedCategories(
      settings.second_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  thirdCategories() {
    return this._allowedCategories(
      settings.third_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  fourthCategories() {
    return this._allowedCategories(
      settings.fourth_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  fifthCategories() {
    return this._allowedCategories(
      settings.fifth_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  sixthCategories() {
    return this._allowedCategories(
      settings.sixth_categories.split('|').map((id) => Number(id))
    );
  },
  @discourseComputed()
  myCategories() {
    try {
      return this?.site?.categories;
    } catch (error) {
      console.log(error);
    }
  },
});
