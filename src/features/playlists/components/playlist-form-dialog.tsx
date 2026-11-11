"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CoverArt } from "@/components/shared/cover-art";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PLAYLIST_COVER_OPTIONS,
  PLAYLIST_DESCRIPTION_MAX,
  PLAYLIST_TITLE_MAX,
} from "@/constants/playlists";
import { usePlaylistsStore, type UserPlaylist } from "@/stores/playlists-store";

const playlistSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Give your playlist a name")
    .max(PLAYLIST_TITLE_MAX, `Use ${PLAYLIST_TITLE_MAX} characters or fewer`),
  description: z
    .string()
    .trim()
    .max(PLAYLIST_DESCRIPTION_MAX, `Use ${PLAYLIST_DESCRIPTION_MAX} characters or fewer`),
  coverUrl: z.string().min(1, "Choose a cover"),
});

type PlaylistFormValues = z.infer<typeof playlistSchema>;

export interface PlaylistFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playlist?: UserPlaylist;
  onSaved?: (playlistId: string) => void;
}

export function PlaylistFormDialog({
  open,
  onOpenChange,
  playlist,
  onSaved,
}: PlaylistFormDialogProps) {
  const editing = playlist !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit playlist" : "Create playlist"}</DialogTitle>
          <DialogDescription>
            {editing
              ? "Change the name, description or cover."
              : "Name your playlist, then add songs to it."}
          </DialogDescription>
        </DialogHeader>
        <PlaylistForm
          playlist={playlist}
          onDone={(id) => {
            onOpenChange(false);
            onSaved?.(id);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function PlaylistForm({
  playlist,
  onDone,
}: {
  playlist?: UserPlaylist;
  onDone: (playlistId: string) => void;
}) {
  const count = usePlaylistsStore((s) => s.playlists.length);
  const createPlaylist = usePlaylistsStore((s) => s.createPlaylist);
  const updatePlaylist = usePlaylistsStore((s) => s.updatePlaylist);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistFormValues>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      title: playlist?.title ?? "",
      description: playlist?.description ?? "",
      coverUrl:
        playlist?.coverUrl ??
        PLAYLIST_COVER_OPTIONS[count % PLAYLIST_COVER_OPTIONS.length] ??
        "",
    },
  });

  const onSubmit = (values: PlaylistFormValues) => {
    if (playlist) {
      updatePlaylist(playlist.id, values);
      toast.success("Playlist updated");
      onDone(playlist.id);
    } else {
      const id = createPlaylist(values);
      toast.success(`Created “${values.title}”`);
      onDone(id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-1.5">
        <label htmlFor="playlist-title" className="text-small font-medium">
          Name
        </label>
        <Input
          id="playlist-title"
          placeholder="My playlist"
          autoComplete="off"
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? "playlist-title-error" : undefined}
          {...register("title")}
        />
        {errors.title ? (
          <p id="playlist-title-error" role="alert" className="text-caption text-subtle-destructive-foreground">
            {errors.title.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="playlist-description" className="text-small font-medium">
          Description <span className="text-muted-foreground">(optional)</span>
        </label>
        <Textarea
          id="playlist-description"
          placeholder="What is this playlist about?"
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "playlist-description-error" : undefined}
          {...register("description")}
        />
        {errors.description ? (
          <p id="playlist-description-error" role="alert" className="text-caption text-subtle-destructive-foreground">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-small font-medium">Cover</legend>
        <div className="grid grid-cols-6 gap-2">
          {PLAYLIST_COVER_OPTIONS.map((src, i) => (
            <label key={src} className="cursor-pointer">
              <input
                type="radio"
                value={src}
                aria-label={`Cover ${i + 1}`}
                className="peer sr-only"
                {...register("coverUrl")}
              />
              <CoverArt
                src={src}
                sizes="64px"
                className="aspect-square rounded-md ring-offset-2 ring-offset-popover peer-checked:ring-2 peer-checked:ring-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">{playlist ? "Save" : "Create"}</Button>
      </DialogFooter>
    </form>
  );
}
