using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace SkyBlog.Model.LocalStorage
{
    /// <summary>
    /// 本次存储文件的读取以及写入服务
    /// </summary>
    public class StorageService
    {
        private static readonly Lazy<StorageService> LInstance = 
            new Lazy<StorageService>(() => new StorageService());

        public static StorageService Instance => LInstance.Value;

        /// <summary>
        /// 缓存的本地存储
        /// </summary>
        private readonly Dictionary<string, IStorable> _storables;

        /// <summary>
        /// 存储路径
        /// </summary>
        private readonly string _storagePath;

        private StorageService()
        {
            _storables = new Dictionary<string, IStorable>();

            // 设置AppData作为存储目录
            var path = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            _storagePath = path + "/SkyBlog/";
            Directory.CreateDirectory(_storagePath);
        }

        /// <summary>
        /// 获取登陆设置存储
        /// </summary>
        /// <returns>登陆设置存储</returns>
        public LoginSettingsStorage GetLoginSettingsStorage()
        {
            return GetStorage<LoginSettingsStorage>();
        }

        /// <summary>
        /// 获取用户信息存储
        /// </summary>
        /// <returns>用户信息存储</returns>
        public UserStorage GetUserStorage()
        {
            return GetStorage<UserStorage>();
        }

        /// <summary>
        /// 保存存储文件
        /// </summary>
        /// <typeparam name="T">可被存储的类</typeparam>
        /// <param name="storable">要存储的对象</param>
        public void SaveStorage<T>(T storable) where T : IStorable
        {
            var fileName = storable.GetFileName();
            var path = _storagePath + fileName;

            // 序列化为JSON字符串
            var json = JsonConvert.SerializeObject(storable);

            // 写入文件
            File.WriteAllText(path,json);

            // 写入缓存
            _storables[fileName] = storable;
        }

        /// <summary>
        /// 获取本地存储对象
        /// </summary>
        /// <typeparam name="T">要获取的存储对象</typeparam>
        /// <returns>本地存储对象</returns>
        public T GetStorage<T>() where T : IStorable, new()
        {
            var storage = new T();
            var fileName = storage.GetFileName();

            if (_storables.ContainsKey(fileName))
            {
                // 直接返回缓存
                return (T)_storables[fileName];
            }

            var json = ReadFile(fileName);
            if (json != null)
            {
                // 反序列化为存储对象
                storage = JsonConvert.DeserializeObject<T>(json);
            }

            // 写入缓存
            _storables[fileName] = storage;

            return storage;
        }

        /// <summary>
        /// 读取文件
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <returns>文件内容，如果不存在文件则返回null</returns>
        private string ReadFile(string fileName)
        {
            var path = _storagePath + fileName;
            return File.Exists(path) ? File.ReadAllText(path) : null;
        }
    }
}
