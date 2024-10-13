"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSWR from "swr";

// Form parameters.
const maxFileSize = 5; //file size in mb
const acceptedFileTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const commissionSchema = z.object({
	discordID: z
		.string()
		.min(3, { message: "Username should be at least 3 characters." }),
	email: z.string().email({ message: "Please enter a valid e-mail adress." }),
	avatarName: z.string().optional(),
	description: z
		.string()
		.min(20, { message: "Please write a description of what you want." })
		.max(2000, {
			message: "Please keep your description to a maximum of 2.000 characters.",
		}),
	files:
		typeof window === "undefined"
			? z.any()
			: z
					.instanceof(FileList)
					.refine((file) => file?.[0]?.size <= maxFileSize * 1024 * 1024, {
						message: "Max file size is " + maxFileSize.toString() + "mb.",
					})
					.refine((file) => acceptedFileTypes.includes(file?.[0]?.type))
					.optional(),
});

// @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const toBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export default function Home() {
	const form = useForm<z.infer<typeof commissionSchema>>({
		resolver: zodResolver(commissionSchema),
		defaultValues: {
			discordID: "",
			email: "",
			avatarName: "",
			description: "",
		},
	});

	const fileRef = form.register("files");

	async function onSubmit(values: z.infer<typeof commissionSchema>) {
		const uploads: unknown[] = [];
		if (values.files) {
			const fileArray = [...values.files];
			await Promise.all(
				fileArray.map(async (f) => {
					const b64file = await toBase64(f);
					uploads.push({
						filename: f.name,
						base64: b64file.split(",").pop(),
						mimetype: f.type,
					});
				})
			);
		}

		const body = JSON.stringify({
			name: values.avatarName,
			discordUsername: values.discordID,
			description: values.description,
			files: uploads,
		});

		console.log(body);

		fetch("https://api.pawlygon.net/commissions/oieeee/application", {
			method: "POST",
			body: body,
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
	}

	const { data } = useSWR("https://api.pawlygon.net/commissions", fetcher);

	return (
		<>
			<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
				{JSON.stringify(data)}
			</code>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="discordID"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discord Username</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Pawly" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Pawly" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="avatarName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Avatar Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Pawly" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>description</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Pawly" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="files"
						render={() => (
							<FormItem>
								<FormLabel>Image references</FormLabel>
								<FormControl>
									<Input
										{...fileRef}
										type="file"
										multiple
										accept={acceptedFileTypes.toString()}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
