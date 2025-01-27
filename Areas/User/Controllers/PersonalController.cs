﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Common;
using QLBH.Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Reflection;
using System.Text;

namespace QLBH.Areas.User.Controllers
{
    public class PersonalController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index()
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if(Usertoken== null)
            {
				return RedirectToAction("Index", "Login", new { area = "User" });
			}
            PersonalModel pm = new PersonalModel();
            pm.userToken = Usertoken;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);
				//personal playlist
				HttpResponseMessage getDataPlaylist = await client.GetAsync("my/Playlist/GetAll");


				if (getDataPlaylist.IsSuccessStatusCode)
				{
					string results = getDataPlaylist.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results); 
					pm.Playlists = JsonConvert.DeserializeObject<List<PlaylistLink>>(results);
                    //Console.WriteLine(pm.Playlists.ToString);
				}
				else
				{
					Console.WriteLine("Error calling web API");
				}

				//bai hat yeu thich

				HttpResponseMessage getData = await client.GetAsync("my/BaihatUser/GetAll");


				if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    pm.BaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                ViewData.Model = pm;

            }
            return View();
        }
        [Area("user")]
        public async Task<IActionResult> PersonalPlaylist(int id)
        {

            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            PersonalModel pm = new PersonalModel();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));



                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);
                //personal playlist
                HttpResponseMessage getDataPlaylist = await client.GetAsync($"my/Playlist/{id}");


                if (getDataPlaylist.IsSuccessStatusCode)
                {
                    string results = getDataPlaylist.Content.ReadAsStringAsync().Result;
                    pm.Playlist = JsonConvert.DeserializeObject<Playlist>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //personal baihat playlist
                HttpResponseMessage getDataBaiHat = await client.GetAsync($"my/Playlist/GetBaiHatPlaylist/{id}");


                if (getDataPlaylist.IsSuccessStatusCode)
                {
                    string results = getDataBaiHat.Content.ReadAsStringAsync().Result;
                    if(results != null){
                        pm.BaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                    }
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                // playlist user
               
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
                //bai hat yeu thich

                HttpResponseMessage getData = await client.GetAsync("my/BaihatUser/GetAll");


                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    pm.BaiHatYeuThichs_Playlist = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                ViewData.Model = pm;

            }
            return View();
        }

        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> AddPlaylist(Playlist playlist)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.PostAsJsonAsync<Playlist>("my/Playlist", playlist);
                response.Wait();
                //Console.WriteLine(response);

                var test = response.Result;
                //Console.WriteLine(test.StatusCode);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Personal", new { area = "User" });
                }
                else
                {
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }

            }
            
        }

        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> AddBaiHatYeuThich(int id, string previous)
        {
            
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.PostAsJsonAsync($"my/BaihatUser/?id={id}", id);
                response.Wait();
                //Console.WriteLine(response);

                var test = response.Result;
                //Console.WriteLine(test.StatusCode);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Personal", new { area = "User" });
                    //return Redirect(previous);
                }
                else
                {
                    Console.WriteLine("error calling API");
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }

            }

        }

        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> DelBaiHatYeuThich(int id)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            //if (Usertoken == null)
            //{
            //    return RedirectToAction("Index", "Login", new { area = "User" });
            //}
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.DeleteAsync($"my/BaihatUser/{id}");
                response.Wait();
                //Console.WriteLine(response);

                var test = response.Result;
                //Console.WriteLine(test.StatusCode);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Personal", new { area = "User" });
                }
                else
                {
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }

            }

        }

        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> AddBaiHatPlaylist(BaiHatPlaylist baiHatPlaylist)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.PostAsJsonAsync($"my/Playlist/BaiHat", baiHatPlaylist);

                response.Wait();
                //Console.WriteLine(response);

                var test = response.Result;
                //Console.WriteLine(test.StatusCode);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("PersonalPlaylist", "Personal", new {id = baiHatPlaylist.PlaylistId, area = "User" });
                    //return PersonalPlaylist(baiHatPlaylist.BaiHatId);

                }
                else
                {
                    Console.WriteLine("error calling API");
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }

            }

        }


        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> DelBaiHatPlaylist(BaiHatPlaylist baiHatPlaylist)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri("https://localhost:7032/api/my/Playlist/BaiHat"),
                    Content = new StringContent(JsonConvert.SerializeObject(baiHatPlaylist), Encoding.UTF8, "application/json")
                };
                var response =  client.SendAsync(request);

                response.Wait();

                var test = response.Result;
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("PersonalPlaylist", "Personal", new {id = baiHatPlaylist.PlaylistId,  area = "User" }) ;

                }
                else
                {
                    Console.WriteLine("error calling API");
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }
            }

        }

        [Area("User")]

        [HttpPost]
        public async Task<IActionResult> UpdatePlaylist(Playlist playlist)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if (Usertoken == null)
            {
                return RedirectToAction("Index", "Login", new { area = "User" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.PutAsJsonAsync<Playlist>("my/Playlist", playlist);
                response.Wait();
                //Console.WriteLine(response);

                var test = response.Result;
                //Console.WriteLine(test.StatusCode);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("PersonalPlaylist", "Personal", new {id = playlist.Id, area = "User" });
                }
                else
                {
                    return RedirectToAction("Index", "Personal", new { area = "User" });
                }

            }

        }
        [Area("User")]
        [HttpPost]
        public async Task<IActionResult> DelPlaylist(int id)
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            //if (Usertoken == null)
            //{
            //    return RedirectToAction("Index", "Login", new { area = "User" });
            //}
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                var response = client.DeleteAsync($"my/Playlist/{id}");
                response.Wait();

                var test = response.Result;
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("index", "Personal", new { area = "User" });
                }
                else
                {
                    return RedirectToAction("Index", "Home", new { area = "User" });
                }

            }

        }
    }
}
