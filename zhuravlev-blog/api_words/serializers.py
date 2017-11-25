from rest_framework import serializers

from words.models import User

class PluginUserSerializer(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = (
            'uuid',
            'words',
            'current_site',
            'quantity_words',
            'username',
        )

class DocumentUserDataSerializer(serializers.ModelSerializer):
    words = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = (
            'words',
        )