{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.postgresql_14
    pkgs.yarn
    pkgs.openssl
  ];
  env = {
    DATABASE_URL = postgres://postgres:@localhost:5432/rme?connection_limit=5&pool_timeout=0;
    PROJECT_ID = "pdgi-rme";
    CLIENT_EMAIL = "storage@pdgi-rme.iam.gserviceaccount.com";
    PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCba+4Cbod1Ozic\nlLeQd0qZi301YCRi1CCVzbwOvb05NsoqRK55pO3QH/g2LAfkGIX/JS4jOdBvmJri\nUXAIedXtE9GxQmUKbIs1l5HMmtnOPlNp9eooR3osqSqKjsiAVku+uxHdp5ZgMkYs\nY+1ZS8TnRLwRhOS+WQct+f7SG51//69QEuW/z56E8PQE5Zy84WNtIDFM+BRIQhjq\nN3z+nKC2wdDoWRqD+FsE6mIyUqvb26FKaf98mV7CsMBNPA2qjOLPe2yMN2V0yy6/\nafgJ7PKi5MNR+u9NXfaH5Q/xlLAoLLZFd+J4+l9pPFhWx6jBR0okD/aGS4iiNBh9\nuB7Z9htRAgMBAAECggEAAU89BJ93HwCac5pXFWqftDE0r1go/GtswbfkhrLjtdX8\nWF5yQMC0VNQFdpuTagQ0yQOoIrgJaiEzzOGzKOhD/Jmsb2TE9lFU9BWxIrNvHvFd\nNTnTHYl7HXormosS9oyGo21WjrjiMP/4ZLoF3PwUvBEoYjgSVha4ChnMYDq69J2B\nPiLeoY3APNwdMTTkLtQDQA5jTCg05gQ6+RrMLAbv1+sZwX49UbyCWvGlRenKvyxE\npGL2y4lyYfaBQwka0/XTmjICEYCL7fOu0I9498B58u0pF5aHawbiRBjpU/cWkivd\nXMKdUDzn5OEYCqBvkinYcqwI8U648V0IhQgbHUB98QKBgQDTTLERsKa6Pw8xj6xJ\nrH87RhAJtwYMg9j4y2ZEni1iDW7hx6/Eb51za5pUGBxd1YgniKyVVDIIYvuHebvE\nBXfC05mDHHvmGSKYG/kO7qSi2dHbbibs7CKyh2muGwt+aJiX0oEjWklv1bHnpZU4\nR6cM78SBwBY71Iw/X22ZMb9zDwKBgQC8TRDZVoLAclBANkRWMkppBpoJFpKcl6VV\nR61OSq7MCmutrqkA9qGYdwyqQYAWeWeEwahV7Jixml+SLza/ZKsu/F9F2vXSiEGf\nAMe2sKU3Viie3ekiPlfOrHFFyq/BojD9kwefgielivVkz+IIe0Plc+qWD778Z6D4\nZI7NtCQLnwKBgQCT/ZnjBvOvbG0qzDLiIuO10xt2gm7FIy87CdKl6pdknn3zupU7\nouUHKu0bSwvLGLxU3B/sMt0cDJ+YwkUlRKMdnHBfaPrKLP6SxLzKnZBH0wFti5fN\nxpGCst7sp1qEfaOqajAyX5Eht+zzjoCVu3Gf2Oqr6apo2zQjSqYLbtFlNwKBgQCE\nXZQrg1G0YGcjTEJraTy/aWGcY9657yvMr+8Wqw8G5Yhd9fpdcAGWQJGJmTOmGL95\nJfzkMcYAiukFxOSyU9y10bhTTaEh1qByWkUJmlD5fjpdutaoOLTW1odlrR4xeob/\nqXxhV0fxaaYosK1Okv/easaLqBP0MBCKq31rAmeYNwKBgFcB5RCvP1dFVjmTjnkP\n0HD+cg3ZNnm/HjQKxKH2A/5UwiNSz4v39/QjtwbpfrdtPGBZVHS98o8jD9KA5+Hh\naZyVHTVZCp3o3zkrDaJKcAtk+0Mkc0aAdhGBYHiDzm7obVsTaA9aEzSVEVONEVxv\nBfjKgtCPm/RQhYOCspU3HuPR\n-----END PRIVATE KEY-----\n";
    BUCKET_NAME = "rme_pdgi";
    NEXT_PUBLIC_GCS_URL = "https://storage.googleapis.com/rme_pdgi/";
    RESEND_API_KEY = "re_CBkAjC42_3uJTz5rdLDnGGFFFKWibyRnL";
    RESEND_FROM_EMAIL = "noreply@pdgi.online";
    IHS_AUTH_URL = https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1;
    IHS_BASE_URL = https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1;
    AUTH_SECRET = "SJF2TxOqSAIW9g7l7m01uSNIMAvlfqMM0ZzU64peJ7M=";
  };
  idx.extensions = [

  ];
  idx.previews = {
    enable = false;
    previews = {
      web = {
        command = [
          "yarn"
          "dev"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
  idx.workspace.onStart = {
    postgre-start = "mkdir /run/postgresql && /usr/bin/pg_ctl -D ~/pgdata -l logfile start";
  };
}
