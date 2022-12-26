using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class PhatnhacController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index(int id)
        {
            HomeModel pm = new HomeModel();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //bai hat 
                HttpResponseMessage getData = await client.GetAsync($"BaiHat/{id}");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    pm.BaiHat = JsonConvert.DeserializeObject<BaiHatLink>(results);

                    //top bai hat nghe si
                    HttpResponseMessage getDatatopbh = await client.GetAsync($"NgheSi/TopBaiHatNgheSi/{id}");

                    if (getDatatopbh.IsSuccessStatusCode)
                    {
                        string resultsbh = getDatatopbh.Content.ReadAsStringAsync().Result;
                        pm.TopBaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(resultsbh);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                // bai hat yeu thich
                var Usertoken = HttpContext.Session.GetString("tokenUser");
                //Console.WriteLine(userToken);
                if (Usertoken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                    HttpResponseMessage getDatabhyt = await client.GetAsync("my/BaihatUser/GetAll");


                    if (getDatabhyt.IsSuccessStatusCode)
                    {
                        string results = getDatabhyt.Content.ReadAsStringAsync().Result;
                        //Console.WriteLine(results);
                        pm.BaiHatYeuThichs = JsonConvert.DeserializeObject<List<BaiHat>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }
                // playlist user
                if (Usertoken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                    HttpResponseMessage getDataplaylist = await client.GetAsync("my/Playlist/GetAll");


                    if (getDataplaylist.IsSuccessStatusCode)
                    {
                        string results = getDataplaylist.Content.ReadAsStringAsync().Result;
                        pm.Playlists = JsonConvert.DeserializeObject<List<PlaylistLink>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }
                ViewData.Model = pm;
                return View();
            }
        }
    }
}
