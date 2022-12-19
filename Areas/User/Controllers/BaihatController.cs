using Microsoft.AspNetCore.Mvc;

namespace QLBH.Areas.User.Controllers
{
    public class BaihatController : Controller
    {
        [Area("User")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
