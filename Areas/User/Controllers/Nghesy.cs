using Microsoft.AspNetCore.Mvc;

namespace QLBH.Areas.User.Controllers
{
    public class Nghesy : Controller
    {
        [Area("user")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
