using System.Web;
using System.Web.Optimization;

namespace FeedbackWithKo {
	public class BundleConfig {
		// For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles) {
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/lib/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/ko").Include(
						"~/Scripts/lib/knockout-{version}.js",
						"~/Scripts/lib/knockout.validation.js"));

			bundles.Add(new ScriptBundle("~/bundles/site").Include(
						"~/Scripts/app/site.bindingHandlers.js",
						"~/Scripts/app/site.core.js",
						"~/Scripts/app/site.services.js",
						"~/Scripts/app/site.controls.js"
						));

			bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
						"~/Scripts/lib/jquery-ui-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
						"~/Scripts/lib/jquery.unobtrusive*",
						"~/Scripts/lib/jquery.validate*"));

			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
						"~/Scripts/lib/modernizr-*"));

			bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

			bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
						"~/Content/themes/base/jquery.ui.core.css",
						"~/Content/themes/base/jquery.ui.resizable.css",
						"~/Content/themes/base/jquery.ui.selectable.css",
						"~/Content/themes/base/jquery.ui.accordion.css",
						"~/Content/themes/base/jquery.ui.autocomplete.css",
						"~/Content/themes/base/jquery.ui.button.css",
						"~/Content/themes/base/jquery.ui.dialog.css",
						"~/Content/themes/base/jquery.ui.slider.css",
						"~/Content/themes/base/jquery.ui.tabs.css",
						"~/Content/themes/base/jquery.ui.datepicker.css",
						"~/Content/themes/base/jquery.ui.progressbar.css",
						"~/Content/themes/base/jquery.ui.theme.css"));
		}
	}
}