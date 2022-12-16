using Microsoft.AspNetCore.Mvc;
//using QLBH.Models;
using System.Diagnostics;

namespace QLBH.Areas.User.Controllers
{
    public class HomeController : Controller
    {
        [Area("user")]
        public ActionResult Index()
        {
            return View();
        }
        [Area("user")]
        public ActionResult About()
        {
            return View();
        }
    }
}