using System.ComponentModel.DataAnnotations;

namespace FeedbackWithKo.Models {
    public class FeedbackViewModel {

        [Required]
        [StringLength(100)]
        [Display(Name = "Тема сообщения")]
        public string Subject { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Как к Вам обращаться")]
        public string UserName { get; set; }

        [Required]
        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Неверный формат электронной почты")]
        [StringLength(50)]
        [Display(Name = "Email для обратной связи")]
        public string EmailAdrress { get; set; }

        [Required]
        [StringLength(500)]
        [DataType(DataType.MultilineText)]
        [Display(Name = "Текст сообщения")]
        public string Message { get; set; }

    }
}