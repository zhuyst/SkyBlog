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

        private readonly Dictionary<string, IStorable> _storables;

        private readonly string _storagePath;

        public static StorageService GetInstance()
        {
            return _instance ?? (_instance = new StorageService());
        }

        private StorageService()
        {
            _storables = new Dictionary<string, IStorable>();

            var path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            _storagePath = path + "/SkyBlog/";
            Directory.CreateDirectory(_storagePath);
        }

        public LoginSettingsStorage GetLoginSettingsStorage()
        {
            return GetStorage<LoginSettingsStorage>(LoginSettingsStorage.FileName);
        }

        public UserStorage GetUserStorage()
        {
            return GetStorage<UserStorage>(UserStorage.FileName);
        }

        public void SaveStorage<T>(T storable) where T : IStorable
        {
            var path = _storagePath + storable.GetFileName();
            var json = JsonConvert.SerializeObject(storable);

            File.WriteAllText(path,json);
        }

        public T GetStorage<T>(string fileName) where T : IStorable, new()
        {
            if (_storables.ContainsKey(fileName))
            {
                return (T)_storables[fileName];
            }

            var json = ReadFile(fileName);

            var storage = json == null ? new T() :
                JsonConvert.DeserializeObject<T>(json);
            _storables[fileName] = storage;

            return storage;
        }

        private string ReadFile(string fileName)
        {
            var path = _storagePath + fileName;
            return File.Exists(path) ? File.ReadAllText(path) : null;
        }
    }
}
