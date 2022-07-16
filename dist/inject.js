import { FLSettingsFrontend } from "./settings.js";
import { EXTENSION_ID, EXTENSION_NAME } from "./constants.js";
import { AutoScrollFixer, JournalUiFixer, ThousandSeparatorFixer } from "./fixers/index.js";
import { debug } from "./logging.js";
const settingsSchema = new Map();
settingsSchema.set("fix_journal_navigation", "Fix color and alignment of the navigation buttons in Journal.");
settingsSchema.set("add_thousands_separator", "Add comma after thousands in the currency indicators.");
settingsSchema.set("auto_scroll_back", "Auto-scroll to the storylet after choosing branch.");
const journalUiFixer = new JournalUiFixer();
const thousandSeparatorFixer = new ThousandSeparatorFixer();
const autoScrollFixer = new AutoScrollFixer();
const settingsFrontend = new FLSettingsFrontend(EXTENSION_ID, EXTENSION_NAME, settingsSchema);
settingsFrontend.installSettingsPage();
settingsFrontend.registerUpdateHandler((settings) => {
    if (settings.fix_journal_navigation) {
        debug("Enabling fixer for Journal UI...");
        journalUiFixer.enable();
    }
    else {
        debug("Disabling stencil fixer for Journal UI...");
        journalUiFixer.disable();
    }
    if (settings.add_thousands_separator) {
        debug("Enabling fixer for currency amounts...");
        thousandSeparatorFixer.enable();
    }
    else {
        debug("Disabling fixer for currency amounts...");
        thousandSeparatorFixer.disable();
    }
    if (settings.auto_scroll_back) {
        debug("Enabling auto scroll back...");
        autoScrollFixer.enable();
    }
    else {
        debug("Disabling auto scroll back...");
        autoScrollFixer.disable();
    }
});
//# sourceMappingURL=inject.js.map