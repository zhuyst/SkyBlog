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
            return GetStorage<LoginSettingsStorage>();
        }

        public UserStorage GetUserStorage()
        {
            return GetStorage<UserStorage>();
        }

        public void SaveStorage<T>(T storable) where T : IStorable
        {
            var fileName = storable.GetFileName();
            var path = _storagePath + fileName;
            var json = JsonConvert.SerializeObject(storable);

            File.WriteAllText(path,json);
            _storables[fileName] = storable;
        }

        public T GetStorage<T>() where T : IStorable, new()
        {
            var storage = new T();
            var fileName = storage.GetFileName();

            if (_storables.ContainsKey(fileName))
            {
                return (T)_storables[fileName];
            }

            var json = ReadFile(fileName);
            if (json != null)
            {
                storage = JsonConvert.DeserializeObject<T>(json);
            }
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
