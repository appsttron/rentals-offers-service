import {EnvironmentConfigService} from "../environment-config/environment-config.service";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

export const rentalsQueueProvider = [
    {
        provide: 'RENTALS_QUEUE',
        useFactory: (environmentConfigService: EnvironmentConfigService) => {
            return ClientProxyFactory.create(
                {
                    transport: Transport.RMQ,
                    options: {
                        urls: [environmentConfigService.getRMQUrl()],
                        queue: environmentConfigService.getRMQQueueName(),
                        noAck: false,
                        queueOptions: {
                            durable: true
                        },
                    },
                },
            )
        },
        inject: [EnvironmentConfigService],
    },
];
