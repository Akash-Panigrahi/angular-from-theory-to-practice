import { ReflectiveInjector } from '@angular/core';
import { InjectionToken } from '@angular/core';

// String tokens
{
  console.log('String tokens example');

  class MandrillService { };
  class SendGridService { };

  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: "EmailService", useClass: MandrillService }
  ]);

  let emailService = injector.get("EmailService");
  console.log(emailService); // new MandrillService()
}

// Type tokens
{
  console.log('Type tokens example');

  class EmailService { };
  class MandrillService extends EmailService { };
  class SendGridService extends EmailService { };

  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: EmailService, useClass: SendGridService }
  ]);

  let emailService = injector.get(EmailService);
  console.log(emailService); // new SendGridService()
}

// String Token (Fail Case) Example
{
  console.log("String Token (Fail Case) Example");

  class MandrillService { }
  class SendGridService { }

  let MandrillServiceToken = "EmailService";
  let SendGridServiceToken = "EmailService";

  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: SendGridServiceToken, useClass: SendGridService },
    { provide: MandrillServiceToken, useClass: MandrillService },
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2); // true
}

// InjectionToken
{
  console.log("InjectionToken");

  class MandrillService { }
  class SendGridService { }

  const MandrillServiceToken = new InjectionToken<string>("EmailService");
  const SendGridServiceToken = new InjectionToken<string>("EmailService");

  let injector = ReflectiveInjector.resolveAndCreate([
    { provide: SendGridServiceToken, useClass: SendGridService },
    { provide: MandrillServiceToken, useClass: MandrillService },
  ]);

  let emailService1 = injector.get(SendGridServiceToken);
  let emailService2 = injector.get(MandrillServiceToken);
  console.log(emailService1 === emailService2);  // false
}