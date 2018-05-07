using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SkyBlog.Model.LocalStorage
{
    public class StorageService
    {
        private static StorageService _instance;

        private readonly string _storagePath;

        public static StorageService GetInstance()
        {
            return _instance ?? (_instance = new StorageService());
        }

        private StorageService()
        {
            var path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            _storagePath = path + "/SkyBlog/";
            Directory.CreateDirectory(_storagePath);
        }

        public LoginSettingsStorage GetLoginSettingsStorage()
        {
            var json = ReadFile(LoginSettingsStorage.FileName);
            return json == null ? new LoginSettingsStorage() : JsonConvert.DeserializeObject<LoginSettingsStorage>(json);
        }

        public UserStorage GetUserStorage()
        {
            var json = ReadFile(UserStorage.FileName);
            return json == null ? new UserStorage() : JsonConvert.DeserializeObject<UserStorage>(json);
        }

        public void SaveStorage<T>(T storable) where T : IStorable
        {
            var path = _storagePath + storable.GetFileName();
            var json = JsonConvert.SerializeObject(storable);

            File.WriteAllText(path,json);
        }

        private string ReadFile(string fileName)
        {
            var path = _storagePath + fileName;
            return File.Exists(path) ? File.ReadAllText(path) : null;
        }
    }
}
