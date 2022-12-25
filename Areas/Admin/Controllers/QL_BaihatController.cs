using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Dynamic;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace QLBH.Areas.Admin.Controllers
{
    public class QL_BaihatController : Controller
    {
        [Area("admin")]
        public async Task<IActionResult> Index()
        {
            if(HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            IList<BaiHatLink> bh = new List<BaiHatLink>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("BaiHat/GetAll");
                Console.WriteLine(getData);

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    bh = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = bh;
                

            }
           
            return View();
        }
        [Area("admin")]

        public async Task<IActionResult> ChiTietBaiHat(int id)
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            BaiHatLink bh = new BaiHatLink();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync($"BaiHat/{id}");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    bh = JsonConvert.DeserializeObject<BaiHatLink>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = bh;

            }
            return View();
        }
        [Area("admin")]

        public async Task<IActionResult> ThemBaiHat()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            else
            {
                ModelViewQgTlAl modelView = new ModelViewQgTlAl();
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:7032/api/");

                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage getData = await client.GetAsync("QuocGia/GetAll");

                    if (getData.IsSuccessStatusCode)
                    {
                        string results = getData.Content.ReadAsStringAsync().Result;
                        modelView.QuocGia = JsonConvert.DeserializeObject<List<QuocGia>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    //the loai
                    HttpResponseMessage getDataTL = await client.GetAsync("TheLoai/GetAll");

                    if (getDataTL.IsSuccessStatusCode)
                    {
                        string results = getDataTL.Content.ReadAsStringAsync().Result;
                        modelView.TheLoai = JsonConvert.DeserializeObject<List<TheLoai>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    HttpResponseMessage getDataAl = await client.GetAsync("Album/GetAll");

                    if (getDataTL.IsSuccessStatusCode)
                    {
                        string results = getDataAl.Content.ReadAsStringAsync().Result;
                        modelView.Album = JsonConvert.DeserializeObject<List<Album>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    //ca si
                    HttpResponseMessage getDataCS = await client.GetAsync("NgheSi/GetAll");

                    if (getDataCS.IsSuccessStatusCode)
                    {
                        string results = getDataCS.Content.ReadAsStringAsync().Result;
                        modelView.NgheSi = JsonConvert.DeserializeObject<List<NgheSi>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    
                    ViewData.Model = modelView;
                    return View();
                }

            }
        }
        [Area("admin")]

        [HttpPost]
        public async Task<IActionResult> ThemBaiHat(QLBaiHatModel BaiHat)
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                var response = client.PostAsJsonAsync<QLBaiHatModel>("BaiHat", BaiHat);
                response.Wait();

                var test = response.Result;
                //Console.WriteLine(response.Result);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("index");
                }

            }
            return View("~/admin/QL_Baihat/ThemBaiHat");
        }

        [Area("admin")]

        public async Task<IActionResult> Edit(int id)
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            else
            {
                ModelViewQgTlAl modelView = new ModelViewQgTlAl();
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:7032/api/");

                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                        HttpResponseMessage getDatabh = await client.GetAsync($"BaiHat/{id}");

                        if (getDatabh.IsSuccessStatusCode)
                        {
                            string results = getDatabh.Content.ReadAsStringAsync().Result;
                            modelView.BaiHatLink = JsonConvert.DeserializeObject<BaiHatLink>(results);
                        }
                        else
                        {
                            Console.WriteLine("Error calling web API");
                        }

                    //quoc gia
                    HttpResponseMessage getData = await client.GetAsync("QuocGia/GetAll");

                    if (getData.IsSuccessStatusCode)
                    {
                        string results = getData.Content.ReadAsStringAsync().Result;
                        modelView.QuocGia = JsonConvert.DeserializeObject<List<QuocGia>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    //the loai
                    HttpResponseMessage getDataTL = await client.GetAsync("TheLoai/GetAll");

                    if (getDataTL.IsSuccessStatusCode)
                    {
                        string results = getDataTL.Content.ReadAsStringAsync().Result;
                        modelView.TheLoai = JsonConvert.DeserializeObject<List<TheLoai>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    HttpResponseMessage getDataAl = await client.GetAsync("Album/GetAll");

                    if (getDataTL.IsSuccessStatusCode)
                    {
                        string results = getDataAl.Content.ReadAsStringAsync().Result;
                        modelView.Album = JsonConvert.DeserializeObject<List<Album>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    //ca si
                    HttpResponseMessage getDataCS = await client.GetAsync("NgheSi/GetAll");

                    if (getDataCS.IsSuccessStatusCode)
                    {
                        string results = getDataCS.Content.ReadAsStringAsync().Result;
                        modelView.NgheSi = JsonConvert.DeserializeObject<List<NgheSi>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }

                    ViewData.Model = modelView;
                    return View();
                }

            }
        }
    }
}
