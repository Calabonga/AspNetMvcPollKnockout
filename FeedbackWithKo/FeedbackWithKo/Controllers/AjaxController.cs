using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FeedbackWithKo.Models;

namespace FeedbackWithKo.Controllers {
    public class AjaxController : Controller {
        [HttpPost]
        public JsonResult SendFeedback(FeedbackViewModel model) {
            if (ModelState.IsValid) {
                // отправляем сообщение...
                return Json(new { result = "Сообщение отправлено" });
            }
            else {
                return Json(new { error = "ошибка в заполнении формы" });
            }
        }
    }
}