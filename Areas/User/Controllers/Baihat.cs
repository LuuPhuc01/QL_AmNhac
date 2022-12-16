using Microsoft.AspNetCore.Mvc;

namespace QLBH.Areas.User.Controllers
{
    public class Baihat : Controller
    {
        [Area("user")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
